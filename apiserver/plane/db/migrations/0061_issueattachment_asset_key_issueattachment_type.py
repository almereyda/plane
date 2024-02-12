# Generated by Django 4.2.7 on 2024-02-05 06:42

from django.db import migrations, models
import django.db.models.deletion


def create_attachment_assets(apps, schema_editor):
    bulk_assets = []

    issue_attachments = {}

    FileAsset = apps.get_model("db", "FileAsset")
    IssueAttachment = apps.get_model("db", "IssueAttachment")

    for issue_attachment in IssueAttachment.objects.values():
        bulk_assets.append(
            FileAsset(
                workspace_id=issue_attachment["workspace_id"],
                project_id=issue_attachment["project_id"],
                entity_identifier=issue_attachment["issue_id"],
                entity_type="issue_attachment",
                asset=issue_attachment["asset"],
                attributes=issue_attachment["attributes"],
            )
        )
        issue_attachments[str(issue_attachment["asset"])] = str(
            issue_attachment["id"]
        )

    FileAsset.objects.bulk_create(bulk_assets, batch_size=100)


class Migration(migrations.Migration):

    dependencies = [
        ("db", "0060_fileasset_size"),
    ]

    operations = [
        migrations.RunPython(create_attachment_assets),
        migrations.DeleteModel(
            name="IssueAttachment",
        ),
        # migrations.AddField(
        #     model_name='cycle',
        #     name='progress_snapshot',
        #     field=models.JSONField(default=dict),
        # ),
    ]
