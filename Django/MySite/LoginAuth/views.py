import json
from random import Random
from django.http import HttpResponse, HttpResponseRedirect
from LoginAuth.models import UserInfo
from django.db.models import ObjectDoesNotExist
import django.utils.timezone as timezone
from django.views.decorators.csrf import ensure_csrf_cookie
# Create your views here.

SESSION_EXPIRED = 3600

class AuthEnum:
    LoginSuccess = 0x00
    PasswordNotMatch = 0x01
    BrokenJson = 0x02


class RegisterEnum:
    RegisterSuccess = 0x00
    UserNameDuplication = 0x01
    BrokenJson = 0x02


def is_cookies_expired(db_info):
    current_time = timezone.now()
    if (current_time - db_info.token_last_modified).seconds > SESSION_EXPIRED:
        return True
    return False


def valid_login_cookies(request):
    if 'userToken' in request.COOKIES:
        db_info = UserInfo.objects.get(user_token=request.COOKIES["userToken"])
        if (type(db_info) != "None") and (not is_cookies_expired(db_info)):
            return db_info.user_id
    return 0


@ensure_csrf_cookie
def login_authentication(request):
    if request.method != "POST":
        return HttpResponse()
    login_state = {}
    cookies_id = valid_login_cookies(request)
    if cookies_id != 0:
        login_state['authState'] = AuthEnum.LoginSuccess
        login_state['userID'] = cookies_id
    else:
        try:
            user_info = json.loads(bytes.decode(request.body))
            db_info = UserInfo.objects.get(user_name=user_info["userName"])
            if db_info.pass_word == user_info["userPassWD"]:
                login_state['authState'] = AuthEnum.LoginSuccess
                login_state['userID'] = db_info.user_id
            else:
                raise ObjectDoesNotExist()
        except ObjectDoesNotExist:
            login_state['authState'] = AuthEnum.PasswordNotMatch
        except KeyError:
            login_state['authState'] = AuthEnum.BrokenJson

    http_response = HttpResponse(json.dumps(login_state))
    if login_state['authState'] == AuthEnum.LoginSuccess and cookies_id == 0:
        if is_cookies_expired(db_info) != 0:
            db_info.user_token = get_random_str(64)
            db_info.save()
            http_response.set_cookie('userToken', db_info.user_token, max_age=SESSION_EXPIRED, expires=SESSION_EXPIRED)
    return http_response


def get_random_str(random_str_length=64):
    strings = ''
    chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    length = len(chars) - 1
    random = Random()
    for i in range(random_str_length):
        strings += chars[random.randint(0, length)]
    return strings


def valid_register_info(info):
    if info["userName"] == "" or len(info["userPassWD"]) != 64:
        print(info["userName"])
        print(len(info["userPassWD"]))
        raise KeyError


@ensure_csrf_cookie
def register_user(request):
    if request.method != "POST":
        return HttpResponse()
    register_state = {}
    user_info = json.loads(bytes.decode(request.body))
    try:
        valid_register_info(user_info)
        UserInfo.objects.get(user_name=user_info["userName"])
        register_state['authState'] = RegisterEnum.UserNameDuplication
    except ObjectDoesNotExist:
        if UserInfo.objects.last() is None:
            user_id = 1
        else:
            user_id = UserInfo.objects.last().user_id + 1
        UserInfo.objects.create(user_name=user_info["userName"], user_id=user_id,
                                pass_word=user_info["userPassWD"], user_token=get_random_str(64),
                                token_last_modified=timezone.now())
        register_state['authState'] = RegisterEnum.RegisterSuccess
    except KeyError:
        register_state['authState'] = RegisterEnum.BrokenJson
    finally:
        http_response = HttpResponse(json.dumps(register_state))
    return http_response
