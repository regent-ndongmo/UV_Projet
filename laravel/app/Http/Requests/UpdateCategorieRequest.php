<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategorieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'photographe_id' => 'required|exists:photographes,id',
            'categorie' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories')->ignore($this->categorie)->where(function ($query) {
                    return $query->where('photographe_id', $this->photographe_id);
                }),
            ],
        ];
    }
}
