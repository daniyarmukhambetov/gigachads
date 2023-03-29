from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django import forms

from .models import User
class UserLoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control py-4',
        'placeholder': 'Введите имя пользователя'
    }))

    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class' : 'form-control py-4',
        'placeholder' : 'Введите пароль'
    }))
    class Meta:
        model = User
        fields = ('username', 'password')


class UserRegisterForm(UserCreationForm):
    first_name = forms.CharField(widget=forms.TextInput(attrs={
        'class' : 'form-control py-4',
        'placeholder' : 'Введите имя'
    }))

    last_name = forms.CharField(widget=forms.TextInput(attrs={
        'class' : 'form-control py-4',
        'placeholder' : 'Введите Фамилию'
    }))

    username = forms.CharField(widget=forms.TextInput(attrs={
        'class' : 'form-control py-4',
        'placeholder' : 'Введите имя пользователя'
    }))

    email = forms.CharField(widget=forms.EmailInput(attrs={
        'class' : 'form-control py-4',
        'placeholder' : 'Введите почту'
    }))

    password1 = forms.CharField(widget=forms.PasswordInput(attrs={
        'class' : 'form-control py-4',
        'placeholder' : 'Введите пароль'
    }))

    password2 = forms.CharField(widget=forms.PasswordInput(attrs={
        'class' : 'form-control py-4',
        'placeholder' : 'Подтвердите почту'
    }))
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'email', 'password1', 'password2')