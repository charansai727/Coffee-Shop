from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Coffee menu (from your Python code)
menu = [
    {"id": 1, "name": "Espresso", "price": 25},
    {"id": 2, "name": "Latte", "price": 40},
    {"id": 3, "name": "Bru", "price": 40},
    {"id": 4, "name": "Cappuccino", "price": 50},
    {"id": 5, "name": "Americano", "price": 70}
]

order = []  # stores current order

@app.route("/")
def index():
    return render_template("index.html", menu=menu)

@app.route("/add", methods=["POST"])
def add_item():
    item_id = request.json.get("id")
    for coffee in menu:
        if coffee["id"] == item_id:
            order.append(coffee)
            return jsonify({"message": f"{coffee['name']} added!", "order": order})
    return jsonify({"error": "Invalid item"}), 400

@app.route("/order")
def get_order():
    total = sum(item["price"] for item in order)
    return jsonify({"order": order, "total": total})

@app.route("/checkout", methods=["POST"])
def checkout():
    global order
    if not order:
        return jsonify({"message": "Your cart is empty."})
    total = sum(item["price"] for item in order)
    order = []  # clear cart
    return jsonify({"message": f"Order confirmed! Total was ${total}"})

if __name__ == "__main__":
    app.run(debug=True)
