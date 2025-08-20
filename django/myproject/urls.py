"""
Description: [Add module purpose here]

Author: Robin
Created: 20.08.2025
Copyright: © 2025 Robin Dönnebrink
"""

from django.contrib import admin
from django.urls import path
from core.views import hello

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", hello),
]
