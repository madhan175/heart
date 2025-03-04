from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample JSON data (replace with your actual data)
heart_data = [
    {"id": 1, "name": "Heart Rate", "value": 72},
    {"id": 2, "name": "Blood Pressure", "value": "120/80"},
]

# Routes
@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Heart Backend API!"

# Get all data
@app.route('/api/data', methods=['GET'])
def get_all_data():
    return jsonify(heart_data)

# Get data by ID
@app.route('/api/data/<int:id>', methods=['GET'])
def get_data_by_id(id):
    item = next((item for item in heart_data if item["id"] == id), None)
    if item:
        return jsonify(item)
    return jsonify({"message": "Data not found"}), 404

# Add new data
@app.route('/api/data', methods=['POST'])
def add_data():
    new_data = request.json
    heart_data.append(new_data)
    return jsonify(new_data), 201

# Update data by ID
@app.route('/api/data/<int:id>', methods=['PUT'])
def update_data(id):
    item = next((item for item in heart_data if item["id"] == id), None)
    if not item:
        return jsonify({"message": "Data not found"}), 404
    item.update(request.json)
    return jsonify(item)

# Delete data by ID
@app.route('/api/data/<int:id>', methods=['DELETE'])
def delete_data(id):
    global heart_data
    heart_data = [item for item in heart_data if item["id"] != id]
    return '', 204

# Start the server
if __name__ == '__main__':
    app.run(debug=True)