<?php

namespace App\method;
use  Illuminate\Http\JsonResponse;

trait Helper
{
    public function responseJson($status, $message, $data = null): JsonResponse
    {
        $response = [
            'status' => $status,
            'message' => $message,
            'data' => $data
        ];
        return response()->json($response);
    }

}
