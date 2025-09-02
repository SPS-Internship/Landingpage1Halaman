<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Footer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FooterController extends Controller
{
    public function index()
    {
        return response()->json(Footer::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'facebook' => 'nullable|url',
            'instagram' => 'nullable|url',
            'twitter' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $footer = Footer::create($request->all());

        return response()->json(['status' => 'success', 'data' => $footer], 201);
    }

    public function update(Request $request, $id)
    {
        $footer = Footer::find($id);
        if (!$footer) return response()->json(['status' => 'error', 'message' => 'Footer not found'], 404);

        $validator = Validator::make($request->all(), [
            'description' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'facebook' => 'nullable|url',
            'instagram' => 'nullable|url',
            'twitter' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $footer->update($request->all());

        return response()->json(['status' => 'success', 'data' => $footer]);
    }

    public function destroy($id)
    {
        $footer = Footer::find($id);
        if (!$footer) return response()->json(['status' => 'error', 'message' => 'Footer not found'], 404);

        $footer->delete();
        return response()->json(['status' => 'success', 'message' => 'Footer deleted successfully']);
    }
}
