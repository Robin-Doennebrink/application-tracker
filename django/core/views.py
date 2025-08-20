"""
Description: [Add module purpose here]

Author: Robin
Created: 20.08.2025
Copyright: © 2025 Robin Dönnebrink
"""

from rest_framework import generics
from .models import ApplicationEntry
from .serializers import ApplicationEntrySerializer

class ApplicationEntryListAPI(generics.ListCreateAPIView):
    queryset = ApplicationEntry.objects.all().order_by("-last_update")
    serializer_class = ApplicationEntrySerializer


