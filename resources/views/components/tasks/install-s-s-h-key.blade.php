<x-tasks.shell-defaults/>

# Check if is Mac OS
if [ "$(uname)" = "Darwin" ]; then
echo "Error: MacOS is not supported" >&2
exit 1
fi

# Must NOT be `root` to proceed
if [ "$(id -u)" = "0" ]; then
    echo "Error: this script must NOT be run as root" >&2
    exit 1
fi


echo "Setting up SSH keys..."

if [ ! -d "$HOME/.ssh" ]
then
    mkdir -p "$HOME/.ssh"
    touch "$HOME/.ssh/authorized_keys"
    chown "$USER:$(id -gn)" "$HOME"
    chown -R "$USER:$(id -gn)" "$HOME/.ssh"
    chmod 700 "$HOME/.ssh"
    chmod 600 "$HOME/.ssh/authorized_keys"
fi

echo "Adding public key on this server..."
echo "{{ $server->public_key }}" >> "$HOME/.ssh/authorized_keys" || echo "Error: Failed to add key"

echo "You may now continue in Alfredo."
