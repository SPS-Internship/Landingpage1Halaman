<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TestimonialController extends Controller
{
    public function index()
    {
        return response()->json(Testimonial::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $testimonial = Testimonial::create([
            'name' => $request->name,
            'message' => $request->message
        ]);

        return response()->json(['status' => 'success', 'data' => $testimonial], 201);
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::find($id);
        if (!$testimonial) {
            return response()->json(['status' => 'error', 'message' => 'Testimonial not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $testimonial->update([
            'name' => $request->name,
            'message' => $request->message
        ]);

        return response()->json(['status' => 'success', 'data' => $testimonial]);
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::find($id);
        if (!$testimonial) {
            return response()->json(['status' => 'error', 'message' => 'Testimonial not found'], 404);
        }

        $testimonial->delete();
        return response()->json(['status' => 'success', 'message' => 'Testimonial deleted successfully']);
    }
}
