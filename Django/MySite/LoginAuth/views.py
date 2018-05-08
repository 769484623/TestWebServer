from django.http import HttpResponse

# Create your views here.

def loginAuthentication(request):
    print(request)
    return HttpResponse("{\"authState\":true,\"userID\": 123456789}")

def registerUser(request):
    return HttpResponse("OK")