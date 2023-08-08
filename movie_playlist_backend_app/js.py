from django import template

register = template.Library()


@register.tag
def js(path):
    """
    Load a JavaScript file from the filesystem.

    Args:
        path (str): The path to the JavaScript file.

    Returns:
        str: The HTML code to load the JavaScript file.
    """

    return """
        <script src="{path}"></script>
    """.format(
        path=path
    )
