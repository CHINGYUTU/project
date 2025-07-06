from django.shortcuts import render

def index(request):
    return render(request,"index.html",locals())
def map(requset):
    return render(requset,"map.html",locals())
