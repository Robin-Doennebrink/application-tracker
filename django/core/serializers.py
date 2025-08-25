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

    def update(self, instance, validated_data):
        # Check if 'status' is being updated
        new_status = validated_data.get("status")

        if new_status:
            # When status changes, update max_stage too
            if new_status != ApplicationEntry.Stage.REJECTED:
                validated_data["max_stage"] = new_status

        return super().update(instance, validated_data)