from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, AdminProfile, TailorProfile, SchoolAdminProfile, ParentProfile, StudentProfile



# Register your models here.
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'role', 'is_staff', 'is_active',)
    list_filter = ('role', 'is_staff', 'is_active',)
    search_fields = ("email",)
    ordering = ("email",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
        ("Role Information", {"fields": ("role",)}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "password1", "password2", "role", "is_staff", "is_active"),
        }),
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(AdminProfile)
admin.site.register(TailorProfile)
admin.site.register(SchoolAdminProfile)
admin.site.register(ParentProfile)
admin.site.register(StudentProfile)

