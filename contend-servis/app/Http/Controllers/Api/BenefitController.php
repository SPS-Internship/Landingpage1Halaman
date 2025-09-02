<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Benefit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BenefitController extends Controller
{
    public function index()
    {
        return response()->json(Benefit::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $benefit = Benefit::create($request->only(['title', 'description']));

        return response()->json(['status' => 'success', 'data' => $benefit], 201);
    }

    public function update(Request $request, $id)
    {
        $benefit = Benefit::find($id);
        if (!$benefit) return response()->json(['status' => 'error', 'message' => 'Benefit not found'], 404);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $benefit->update($request->only(['title', 'description']));

        return response()->json(['status' => 'success', 'data' => $benefit]);
    }

    public function destroy($id)
    {
        $benefit = Benefit::find($id);
        if (!$benefit) return response()->json(['status' => 'error', 'message' => 'Benefit not found'], 404);

        $benefit->delete();
        return response()->json(['status' => 'success', 'message' => 'Benefit deleted successfully']);
    }
}
