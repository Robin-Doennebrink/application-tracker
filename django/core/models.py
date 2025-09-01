"""
Description: All models of this application.

Author: Robin Dönnebrink
Created: 20.08.2025
Copyright: © 2025 Robin Dönnebrink
"""

from django.db import models


class ApplicationEntry(models.Model):
    class Status(models.TextChoices):
        APPLIED = "applied", "Applied"
        INTERVIEW1 = "interview1", "Interview 1"
        INTERVIEW2 = "interview2", "Interview 2"
        INTERVIEW3 = "interview3", "Interview 3"
        INTERVIEW4 = "interview4", "Interview 4"
        INTERVIEW5 = "interview5", "Interview 5"
        OFFER = "offer", "Offer"
        REJECTED = "rejected", "Rejected"

    class Stage(models.TextChoices):
        NONE = "none", "None"
        ACKNOWLEDGMENT = "acknowledgment", "Acknowledgment"
        INTERVIEW1 = "interview1", "Interview 1"
        INTERVIEW2 = "interview2", "Interview 2"
        INTERVIEW3 = "interview3", "Interview 3"
        INTERVIEW4 = "interview4", "Interview 4"
        INTERVIEW5 = "interview5", "Interview 5"
        OFFER = "offer", "Offer"
        REJECTED = "rejected", "Rejected"

    company = models.CharField(max_length=255)           # Firma
    application_date = models.DateField()                # Bewerbungsdatum
    job_title = models.CharField(max_length=255)         # Stellenbezeichnung
    job_posting = models.TextField(blank=True, null=True)  # Stellenausschreibung
    status = models.CharField(                           # Stand
        max_length=20,
        choices=Status.choices,
        default=Status.APPLIED,
    )
    max_stage = models.CharField(                        # Maximale Stufe
        max_length=20,
        choices=Stage.choices,
        default=Stage.NONE,
    )
    expected_response_date = models.DateField(blank=True, null=True)  # Date you expect to hear back (for interview)
    last_update = models.DateField(auto_now=True)        # Last update

    def __str__(self):
        return f"{self.company} - {self.job_title} ({self.get_status_display()})"
