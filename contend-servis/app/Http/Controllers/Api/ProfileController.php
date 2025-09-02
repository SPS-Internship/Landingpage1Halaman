<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function index()
    {
        return response()->json(Profile::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'company_name' => 'required|string|max:255',
            'company_description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $profile = Profile::create([
            'company_name' => $request->company_name,
            'company_description' => $request->company_description,
        ]);

        return response()->json(['status' => 'success', 'data' => $profile], 201);
    }

    public function update(Request $request, $id)
    {
        $profile = Profile::find($id);
        if (!$profile) return response()->json(['status' => 'error', 'message' => 'Profile not found'], 404);

        $validator = Validator::make($request->all(), [
            'company_name' => 'required|string|max:255',
            'company_description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $profile->update([
            'company_name' => $request->company_name,
            'company_description' => $request->company_description,
        ]);

        return response()->json(['status' => 'success', 'data' => $profile]);
    }

    public function destroy($id)
    {
        $profile = Profile::find($id);
        if (!$profile) return response()->json(['status' => 'error', 'message' => 'Profile not found'], 404);

        $profile->delete();
        return response()->json(['status' => 'success', 'message' => 'Profile deleted successfully']);
    }
}
