from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, AdminProfile, TailorProfile, SchoolAdminProfile, ParentProfile, StudentProfile



# Register your models here.
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active',)
    list_filter = ('role', 'is_staff', 'is_active',)
    search_fields = ("username", "email")
    ordering = ("id",)
    fieldsets = UserAdmin.fieldsets + (
        ("Role Information", {"fields": ("role",)}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Role Information", {"fields": ("role",)}),
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(AdminProfile)
admin.site.register(TailorProfile)
admin.site.register(SchoolAdminProfile)
admin.site.register(ParentProfile)
admin.site.register(StudentProfile)

