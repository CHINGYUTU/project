from django.shortcuts import render

def map(requset):
    return render(requset,"map.html",locals())
