<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\method\Helper;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
   use Helper;

    // login
    public function login(Request $request){

        $validator = validator()->make($request->all(),[
            'email' => ['email','required','string'],
            'password' => 'required'
        ]);

        if ($validator->fails()){
            return $this->responseJson(0,$validator->errors()->first(),$validator->errors());
        }

        $user = User::where('email',$request->email)->first();
        if($user){
           if(Hash::check($request->password,$user->password)){
               return $this->responseJson(1,'you login successfully',['data'=>$user]);
           }
        }
        return $this->responseJson(0,'you dont have account');
    }
}
