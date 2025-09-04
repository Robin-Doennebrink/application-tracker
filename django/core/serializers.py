"""
Description: The serializers of all the models.

Author: Robin Dönnebrink
Created: 20.08.2025
Copyright: © 2025 Robin Dönnebrink
"""
from datetime import date
from typing import Optional

from rest_framework import serializers
from .models import ApplicationEntry

class ApplicationEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationEntry
        fields = "__all__"

    def update(self, instance: ApplicationEntry, validated_data: dict[str, Optional[str | int | date]]):
        # Check if 'status' is being updated
        new_status = validated_data.get("status")
        # Check if expected_response_date is before today
        if new_date:= validated_data.get("expected_response_date"):
            if new_date < date.today():
                raise serializers.ValidationError("Expected response date cannot be in the future.")
        if new_status:
            # When status changes, update max_stage too
            if new_status != ApplicationEntry.Stage.REJECTED:
                validated_data["max_stage"] = new_status
                # Set expected_response_date to None if status was an offer or acknowledgment
                if new_status in [ApplicationEntry.Stage.OFFER, ApplicationEntry.Stage.ACKNOWLEDGMENT]:
                    validated_data["expected_response_date"] = None

        return super().update(instance, validated_data)