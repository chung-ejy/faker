from django.shortcuts import render
from django.http import JsonResponse
import pickle
from textblob import TextBlob
from pymongo import MongoClient
import pandas as pd
import json
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

@csrf_exempt
def newsView(request):
    client = MongoClient("localhost",27017)
    try:
        db = client["news"]
        table= db["model"]
        data = table.find(show_record_id=False)
        model = pd.DataFrame(list(data))
    except Exception as e:
        print(str(e))
    client.close()
    m = pickle.loads(model["model"].item())
    data = json.loads(request.body.decode("utf-8"))
    complete = {}
    texttb = TextBlob(data["text"])
    titletb = TextBlob(data["title"])
    complete["tpolarity"] = titletb.sentiment.polarity
    complete["tsubjectivity"] = titletb.sentiment.subjectivity
    complete["polarity"] = texttb.sentiment.polarity
    complete["subjectivity"] = texttb.sentiment.subjectivity
    classification = int(m.predict(pd.DataFrame([complete])))
    complete["classification"] = classification
    complete["title"] = data["title"]
    complete["text"] = data["text"]
    return JsonResponse(complete,safe=False)