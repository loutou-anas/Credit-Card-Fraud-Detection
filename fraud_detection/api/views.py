from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TransactionSerializer
import joblib
import numpy as np

# Load the trained model
model = joblib.load('ml_model/fraud_model.pkl')

class PredictFraud(APIView):
    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            features = [data[feature] for feature in data]
            features = np.array(features).reshape(1, -1)
            prediction = model.predict(features)
            result = 'Fraudulent' if prediction[0] == 1 else 'Legitimate'
            return Response({'prediction': result}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
