from django.shortcuts import render
from django.http import JsonResponse
import pickle
import os


MODEL_PATH='model/rf_model.pkl'
# MODEL_PATH = os.path.join(os.path.dirname(__file__), './rf_model.pkl')
# Load your machine learning model
with open(MODEL_PATH, 'rb') as model_file:
    model = pickle.load(model_file)

# Function to make predictions
def make_prediction(state_name, crop_season):
    # Assuming your model.predict function takes state_name and crop_season as input
    prediction = model.predict([[state_name, crop_season]])  # Adjust based on your model input format
    return prediction

def index(request):
    return render(request, 'index.html')

def Results(request):
    return render(request, 'Results.js')

def submit_form(request):
    if request.method == 'POST':
        # Get the input data from the request
        state_name = request.POST.get('stateName')
        crop_season = request.POST.get('cropSeason')

        # Perform any preprocessing if necessary

        # Make prediction using the loaded model
        predictions = make_prediction(state_name, crop_season)

        # Print the predicted results in console
        print("Predicted Results:", predictions)

        # Store the predictions in a list
        prediction_list = list(predictions)

        # Render the Results page and pass the prediction list as context
        return render(request, 'Results.js', {'predictions': prediction_list})

    # Handle other HTTP methods or invalid requests
    return JsonResponse({'error': 'Invalid request method'}, status=405)
