from flask import Flask, request, jsonify, render_template
import numpy as np
import math

app = Flask(__name__)

def evaluate_function(func, x_values):
    y_values = []
    for x in x_values:
        try:
            y = eval(func, {"__builtins__": None, "x": x, "math": math, "np": np})
            y_values.append(y)
        except Exception as e:
            y_values.append(None)
    return y_values

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/plot', methods=['POST'])
def plot():
    data = request.json
    func = data['function']
    x_min = data['x_min']
    x_max = data['x_max']
    num_points = data['num_points']
    
    x_values = np.linspace(x_min, x_max, num_points)
    y_values = evaluate_function(func, x_values)
    
    return jsonify({'x': x_values.tolist(), 'y': y_values})

if __name__ == '__main__':
    app.run(debug=True)
