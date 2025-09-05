"""
Description: All views of this application.

Author: Robin Dönnebrink
Created: 20.08.2025
Copyright: © 2025 Robin Dönnebrink
"""

from rest_framework import generics
from .models import ApplicationEntry
from .serializers import ApplicationEntrySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count


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
            .order_by("expected_response_date")
        )




@api_view(['GET'])
def application_aggregates(request):
    queryset = ApplicationEntry.objects.all()

    # Aggregate by status
    status_counts = queryset.values('status').annotate(count=Count('id')).order_by('status')

    # Aggregate by max_stage
    stage_counts = queryset.values('max_stage').annotate(count=Count('id')).order_by('max_stage')

    return Response({
        "status_counts": status_counts,
        "max_stage_counts": stage_counts,
        "total": queryset.count(),
    })
