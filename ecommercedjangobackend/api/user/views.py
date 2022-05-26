from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .serializers import UserSerializer
from .models import CustomUser

from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login,logout

import re
import random

def generate_session_token():
    length=10
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97,123)]+[str(i) for i in range(10)])for _ in range(length))

# for signin from other origin.
@csrf_exempt
def signin(request):
    if not request.method=="POST":
        return JsonResponse({'detail':'Send a POST request with valid parameter only','success':False,'error':True})
    
    username=request.POST['email']
    password=request.POST['password']

    # Validataion
    # Check for the email
    if not re.match("^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$",username):
        return JsonResponse({'detail':'Enter a valid email','success':False,'error':True})

    if len(password)<5:
        return JsonResponse({'detail':'Password need to be at least 5 letters','success':False,'error':True})
    # validataion is over

    UserModel=get_user_model()

    try:
        user=UserModel.objects.get(email=username)
        if user.check_password(password):
            user_dict=UserModel.objects.filter(email=username).values().first()
            user_dict.pop('password')

            if user.session_token!="0":
                user.session_token="0"
                user.save()
                return JsonResponse({'detail':'Previous session exist','success':False,'error':True})
            
            token=generate_session_token()
            user.session_token = token
            user.save()
            login(request,user)
            return JsonResponse({"token":token,"user":user_dict,'success':True,'error':False})
        else:
            return JsonResponse({"detail":"Invalid Password",'success':False,'error':True})

    except UserModel.DoesNotExist:
        return JsonResponse({'detail':'Invalid Email','success':False,'error':True})

@csrf_exempt
def signout(request,id):
    UserModel=get_user_model()

    try: 
        # print(id)                                                                                                                                                                                                                                                               
        user=UserModel.objects.get(pk=id)
        # print(user)
        user.session_token="0"
        user.save()              
    except UserModel.DoesNotExist:
        return JsonResponse({"detail":"Invalid user id",'success':False,"error":True})

    logout(request)  
    return JsonResponse({"detail":"Logout success",'success':True,"error":False})

#signup ->
class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action={
        'create':[AllowAny]
    }

    queryset=CustomUser.objects.all().order_by('id')
    serializer_class=UserSerializer

    # Override
    def get_permissions(self):
        try:
            # print(self.action)
            # print(self.permission_classes_by_action[self.action])
            # # response=[]
            # for permission in self.permission_classes_by_action[self.action]:
            #     print(permission)
            # # print(response)
            # print(self.action)

            # value -> ABSTRACT USER -> Model
            x=[permission() for permission in self.permission_classes_by_action[self.action]]
            
            # def fun():
            #     return [1,2,3]
            # y=[fun() for i in range(3)]

            # print(y)

            # return response
            return x
        except KeyError:
            return [permission() for permission in self.permission_class]
            