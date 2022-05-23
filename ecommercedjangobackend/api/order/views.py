from rest_framework import viewsets

from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

from .serializers import OrderSerializer
from .models import Order

def validate_user_session(id,token):
    UserModel=get_user_model()
    try:
        user=UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False

@csrf_exempt
def add(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({"error":"Please re-login"})
    
    if request.method=="POST":
        transaction_id=request.POST["transaction_id"]
        amount=request.POST["amount"]
        products=request.POST["products"]
        total_product=len(products.split(',')[:-1])
        UserModel=get_user_model()
        try:
            user=UserModel.objects.get(pk=id)
        except UserModel.DoesNotExist:
            return JsonResponse({"error":"User does not exist"})

        order_to_be_saved=Order(user=user,product_names=products,total_products=total_product,transaction_id=transaction_id,total_amount=amount)
        order_to_be_saved.save()
        return JsonResponse({"success":"order placed successfully"})

class OrderViewSet(viewsets.ModelViewSet):
    queryset=Order.objects.all().order_by("product_names")
    serializer_class=OrderSerializer