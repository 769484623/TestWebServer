from django.http import HttpResponse, HttpResponseRedirect
from LoginAuth.models import UserInfo
from django.db.models import ObjectDoesNotExist
import json
# Create your views here.


class AuthEnum:
    LoginSuccess = 0x00
    PasswordNotMatch = 0x01
    BrokenJson = 0x02


class RegisterEnum:
    RegisterSuccess = 0x00
    UserNameDuplication = 0x01
    BrokenJson = 0x02


def login_authentication(request):
    if request.method != "POST":
        return HttpResponseRedirect("/")
    login_state = {}
    try:
        user_info = json.loads(bytes.decode(request.body))
        db_info = UserInfo.objects.get(user_name=user_info["userName"])
        if db_info.pass_word == user_info["userPassWD"]:
            login_state['authState'] = AuthEnum.LoginSuccess
            login_state['userID'] = db_info.user_id
            login_state['userToken'] = db_info.user_token
        else:
            raise ObjectDoesNotExist()
    except ObjectDoesNotExist:
        login_state['authState'] = AuthEnum.PasswordNotMatch
    except KeyError:
        login_state['authState'] = AuthEnum.BrokenJson
    finally:
        http_response = HttpResponse(json.dumps(login_state))
    return http_response


def secret_token(request):
    print(request)
    return HttpResponse("")

def valid_register_info(info):
    if info["userName"] == "" or len(info["userPassWD"]) != 64:
        print(info["userName"])
        print(len(info["userPassWD"]))
        raise KeyError


def register_user(request):
    if request.method != "POST":
        return HttpResponseRedirect("/")
    register_state = {}
    user_info = json.loads(bytes.decode(request.body))
    try:
        valid_register_info(user_info)
        UserInfo.objects.get(user_name=user_info["userName"])
        register_state['authState'] = RegisterEnum.UserNameDuplication
    except ObjectDoesNotExist:
        UserInfo.objects.create(user_name=user_info["userName"], user_id=UserInfo.objects.last().user_id + 1,
                                pass_word=user_info["userPassWD"], user_token='justatest')
        register_state['authState'] = RegisterEnum.RegisterSuccess
    except KeyError:
        register_state['authState'] = RegisterEnum.BrokenJson
    finally:
        http_response = HttpResponse(json.dumps(register_state))
    return http_response
