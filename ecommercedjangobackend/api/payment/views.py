from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

import braintree

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="wdw3zhdpk7vs3ydz",
        public_key="wjpgyx8k6jjgcts4",
        private_key="3bd4ec1410c426f9d3cc6e16e203848b"
    )
)

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
def generate_token(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({"error":"invalid session, please re-login"})

    client_token = gateway.client_token.generate()
    # print(client_token)
    return JsonResponse({"clientToken":client_token,"success":True})

@csrf_exempt
def process_payment(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({"error":"invalid session, please re-login"})

    nonce_from_the_client=request.POST["paymentNonce"]
    amount_from_the_client=request.POST["amount"]

    result=gateway.transaction.sale({
        "amount":amount_from_the_client,
        "payment_method_nonce":nonce_from_the_client,
        "options":{
            "submit_for_settlement":True
        }
    })

    if result.is_success:
        return JsonResponse({"success":result.is_success,
        "transaction":{
            'id':result.transaction.id,
            'amount':result.transaction.amount
        }})
    else:
        return JsonResponse({"error":"payment unsuccessful"})