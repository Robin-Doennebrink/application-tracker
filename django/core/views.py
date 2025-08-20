"""
Description: [Add module purpose here]

Author: Robin
Created: 20.08.2025
Copyright: © 2025 Robin Dönnebrink
"""

from django.http import HttpResponse

def hello(request):
    return HttpResponse("Hello from Django + MySQL in Docker!")
