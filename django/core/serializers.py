"""
Description: The serializers of all the models.

Author: Robin Dönnebrink
Created: 20.08.2025
Copyright: © 2025 Robin Dönnebrink
"""
from rest_framework import serializers
from .models import ApplicationEntry

class ApplicationEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationEntry
        fields = "__all__"