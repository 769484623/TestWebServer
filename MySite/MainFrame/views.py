from django.shortcuts import render

# Create your views here.

def index(request):
    content = {'context': 'This is the Main Page.'}
    return render(request, '/home/lnstar/PycharmProjects/TestWebServer/MySite/MainFrame/templates/index.html', content)
