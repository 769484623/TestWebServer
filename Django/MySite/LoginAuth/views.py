from django.http import HttpResponse

# Create your views here.

def loginAuthentication(request):
    print(request)
    return HttpResponse('OK')
