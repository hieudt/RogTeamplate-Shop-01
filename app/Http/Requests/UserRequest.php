<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'repassword' => 'required|same:password'
        ];
    }

    /**
     * Get the message validation rules
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'This field name required value !',
            'email.required' => 'This field email required value !',
            'email.email' => 'This email invalid !',
            'email.unique' => 'This email exists',
            'password.required' => 'This field password required value !',
            'repassword.required' => 'This field repassword required value !',
            'repassword.same' => 'This field repassword not match field password !',
        ];
    }
}
