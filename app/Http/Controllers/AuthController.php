<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserUpdateRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use DB;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req)
    {   
        $users = User::orderBy($req->sort, $req->sortDir)->paginate(10);

        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        $data = $request->validated();
        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $users = User::find($user);

        return response()->json($users);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (! $user) {
            return response()
            ->json(['error' => 'Error: User not found']);
        }

        if (isset($request->changepw) && $request->changepw == true) {
            $request->validate([
                'newpass' => 'required',
                'oldpass' => 'required',
            ]);

            if (Hash::check($request->oldpass, $user->password)) {
                $user->password = bcrypt($request->newpass);
            } else {
                return response()->json(['error' => 'Error Update'], 500);
            }
        }
        $user->update($request->all());
        return response()
            ->json(['message' => 'Success: You have updated the user']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if (! $user) {
            return response()
            ->json(['error' => 'Error: User not found']);
        }
        $user->delete();
        return response()
            ->json(['message' => 'Success: You have deleted the user']);
    }

    public function destroyMultiple(Request $request) {
        DB::beginTransaction();
        try {
            User::whereIn('id', $request->data_del)->delete();
            DB::commit();

            return response()->json(['message' => 'Success: You have deleted the user']);
        } catch (Exception $th) {
            DB::rollBack();
            throw new Exception($th->getMessage());
        }
    }

    public function edit($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'The user is not exists']);
        }

        return response()->json($user);
    }

    /**
     * Login function
     *
     * @param Request $request
     * @return json
     */
    public function login(UserLoginRequest $request)
    {
        $request->validated();
        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        $token->save();

        return response()->json([
            'user' => $user,
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }
}
