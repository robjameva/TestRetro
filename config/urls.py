from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from accounts.api import (
    UserViewSet,
    UserSearchView,
    AvatarViewSet,
    GuestRegistration,
    AuthSetup,
)
from boards.api import (
    BoardViewSet,
    ColumnViewSet,
    LabelViewSet,
    TaskViewSet,
    SortColumn,
    SortTask,
    CommentViewSet,
    UpVoteViewSet,
)

router = routers.DefaultRouter()
router.register(r"avatars", AvatarViewSet)
router.register(r"users", UserViewSet)
router.register(r"boards", BoardViewSet)
router.register(r"columns", ColumnViewSet)
router.register(r"labels", LabelViewSet)
router.register(r"tasks", TaskViewSet)
router.register(r"comments", CommentViewSet)
router.register(r"votes", UpVoteViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/u/search/", UserSearchView.as_view(), name="user-search"),
    path("api/sort/column/", SortColumn.as_view(), name="sort-column"),
    path("api/sort/task/", SortTask.as_view(), name="sort-task"),
    path("api-auth/", include("rest_framework.urls")),
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
    path("auth/setup/", AuthSetup.as_view(), name="auth-setup"),
    path("auth/guest/", GuestRegistration.as_view(), name="guest-registration"),
    path("admin/", admin.site.urls),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    try:
        import debug_toolbar

        urlpatterns = [
            path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
    except ModuleNotFoundError:
        pass
