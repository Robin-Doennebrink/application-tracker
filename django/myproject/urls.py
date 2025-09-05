"""
Description: All URLs of this application.

Author: Robin Dönnebrink
Created: 20.08.2025
Copyright: © 2025 Robin Dönnebrink
"""

from django.contrib import admin
from django.urls import path
from core.views import ApplicationEntryListAPI, ApplicationEntryDetailAPI, ApplicationEntryInterviewListAPI, \
    application_aggregates

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/applications/", ApplicationEntryListAPI.as_view()),
    path("api/applications/<int:pk>/", ApplicationEntryDetailAPI.as_view()),
    path("api/application/interviews/", ApplicationEntryInterviewListAPI.as_view()),
    path("api/application/aggregates/", application_aggregates, name='application-aggregates'),

]