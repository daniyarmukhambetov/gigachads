from django.shortcuts import render, HttpResponseRedirect, redirect
from .forms import *
from django.contrib import auth
from django.urls import reverse

def login(request):
    if request.method == 'POST':
        form = UserLoginForm(data = request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = auth.authenticate(username=username, password=password)
            if user:
                auth.login(request, user)
                return redirect('http://localhost:3000/')
    
    else:
        form = UserLoginForm()

    context = {'form': form}
    return render(request, 'users/login.html', context)

    
def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(data = request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('users:login'))

    else:
        form = UserRegisterForm()

    context = {'form': form}
    return render(request, 'users/register.html', context)