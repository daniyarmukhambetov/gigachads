from rest_framework import permissions


class TicketPermissions(permissions.BasePermission):
    message = "You don't have access!"

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user == obj.user or request.user.is_staff:
            return True

        return True