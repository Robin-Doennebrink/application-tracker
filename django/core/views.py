"""
Description: All views of this application.

Author: Robin Dönnebrink
Created: 20.08.2025
Copyright: © 2025 Robin Dönnebrink
"""

from rest_framework import generics
from .models import ApplicationEntry
from .serializers import ApplicationEntrySerializer

class ApplicationEntryListAPI(generics.ListCreateAPIView):
    queryset = ApplicationEntry.objects.all().order_by("-last_update")
    serializer_class = ApplicationEntrySerializer

class ApplicationEntryDetailAPI(generics.RetrieveUpdateAPIView):
    queryset = ApplicationEntry.objects.all()
    serializer_class = ApplicationEntrySerializer

class ApplicationEntryInterviewListAPI(generics.ListAPIView):
    """
    Returns all ApplicationEntry objects currently in an interview stage.
    """
    serializer_class = ApplicationEntrySerializer

    def get_queryset(self):
        return (
            ApplicationEntry.objects
            .filter(status__startswith="interview")
            .order_by("-last_update")
        )


