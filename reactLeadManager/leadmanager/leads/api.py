from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

# Lead Viewset
class LeadViewSet(viewsets.ModelViewSet):
  
  permission_classes = [
    permissions.IsAuthenticated
  ]

  serializer_class = LeadSerializer

  def get_queryset(self):
    # Get aonly the leads of the user
    return self.request.user.leads.all

  # Save the lead owner when creating the lead
  def perform_create(self, serializer):
    serializer.save(owner=self.request.user)



