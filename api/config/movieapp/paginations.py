from rest_framework.pagination import CursorPagination

class SavedTimeBasedPagination(CursorPagination):
    ordering = '-saved_at'
