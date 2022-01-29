# Install instructions for Arch Linux on EFI systems with XFS and swap partitions + systemd-boot + KDE Plasma

-   I am using a single hard drive.
-   The swap partition needs to be greater than or equal to the RAM installed on your computer (32G in my case).
-   I live in Europe/Paris, I use a US keyboard and speak US english

### 1. Check your BIOS settings and enable UEFI

### 2. Boot on the latest Arch Linux ISO.

### 3. Check that boot mode is EFI

```bash
ls /sys/firmware/efi/efivars
```

If the command shows the directory without error, then the system is booted in UEFI mode. If the directory does not exist, the system may be booted in BIOS mode.

###  4. Check that the network interfaces are recognized && internet is working

```bash
ip link
ping google.com
```

###  5. Update the system clock && check UTC is selectioned

```bash
timedatectl set-ntp true
timedatectl status
```

###  6. Partitions

#### 1. List your disks with `fdisk`

```bash
fdisk -l
```

#### 2. Run `fdisk` on the disk you want to Arch to be installed

```bash
fdisk /dev/sda
```

#### 3. Create a new GPT partition table

```bash
In fdisk, "g" for GPT partitions table
```

#### 4. Create the following partitions:

<table>
    <thead>
        <tr>
            <th>Partition</th>
            <th>First sector</th>
            <th>Last sector</th>
            <th>Type</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>/dev/sda1</td>
            <td>default</td>
            <td>+550M</td>
            <td>EFI System (1)</td>
        </tr>
        <tr>
            <td>/dev/sda2</td>
            <td>default</td>
            <td>+33G</td>
            <td>swap (19)</td>
        </tr>
        <tr>
            <td>/dev/sda3</td>
            <td>default</td>
            <td>default</td>
            <td>Linux filesystem (20)</td>
        </tr>
    </tbody>
</table>

```bash
In fdisk, "n" for add new partition
In fdisk, "p" for primary partition (if using MBR instead of GPT)
In fdisk, "t" to change partition type
```

#### 5. Write the table to the disk

```bash
In fdisk, "w" (write table to disk)
```

###  7. Format the partitions

#### 1. Format the EFI boot partition to Fat32

```bash
mkfs.fat -F32 /dev/sda1
```

#### 2. Format the swap partition to swap and enable it

```bash
mkswap /dev/sda2
swapon /dev/sda2
```

#### 3. Format the root partition to XFS

```bash
mkfs.xfs /dev/sda3
```

###  8. Mount the partitions

```bash
mount /dev/sda3 /mnt (mount the root partition)

mkdir /mnt/boot
mount /dev/sda1 /mn/boot (mount the boot partition)
```

###  9. Install Arch with base and important packages

```bash
pacstrap /mnt base base-devel linux linux-firmware amd-ucode efibootmgr dosfstools os-prober mtools pipewire pipewire-pulse xf86-video-amdgpu xorg neovim
```

Note:

-   `amd-ucode` is the microcode package for my AMD Ryzen 7 4800H, use another one if your are not using an AMD cpu.
-   `pipewire` & `pipewire-pulse` are optional. I want to use Pipewire instead of PulseAudio.
-   `xf86-video-amdgpu` is the graphic driver for my APU. Change it to the one you need
-   `xorg` is required to install KDE any other DE or WM once Arch is installed
-   `neovim` is my editor of choice, but pick the one you like.

###  10. Generate an fstab file

Configure the system

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

###  11. Change root into the new system

```bash
arch-chroot /mnt
```

###  12. Time zone, clock and localization setup

#### 1. Time zone

```bash
ln -sf /usr/share/zoneinfo/Europe/Paris /etc/localtime
hwclock --systohc (generates /etc/adjtime)
```

#### 2. Localization

-   Edit `/etc/locale.gen` and uncomment `en_US.UTF-8 UTF-8`.

```bash
nvim /etc/locale.gen
```

-   Generate the locales by running.

```bash
locale-gen
```

-   Create the `/etc/locale.conf` file, and set the `LANG` variable accordingly:

```bash
LANG=en_US.UTF-8
```

###  12. Network configuration

#### 1. Set the hostname:

```bash
echo "axel-laptop" >> /etc/hostname
```

#### 2. Set the hosts:

```bash
echo "127.0.0.1    localhost" >> /etc/hosts
echo "::1          localhost" >> /etc/hosts
echo "127.0.1.1	   axel-laptop.localdomain axel-laptop" >> /etc/hosts
```

#### 3. Install and enable NetworkManager

```bash
pacman -S networkmanager
systemctl enable NetworkManager
```

###  13. Users, passwords and privileges

#### 1. Set the password and create a new user

```bash
passwd (set root pass)
useradd -m axelz (make another user)
passwd axelz (set that user's password)
usermod -aG wheel,audio,video,optical,storage axelz
```

#### 2. Install sudo, edit the sudo config and uncomment `%wheel ALL=(ALL) ALL`.

```bash
pacman -S sudo
EDITOR=nvim visudo
```

###  14. Bootloader

#### 1. Install systemd-boot

```bash
bootctl --path=/boot install
```

#### 2. Edit `/boot/loader/loader.conf` and write `default arch.conf`

#### 3. Edit `/boot/loader/entries/arch.conf` and write the following:

```bash
title Arch Linux
linux /vmlinuz-linux
initrd /amd-ucode.img
initrd /initramfs-linux.img
options root=PARTUUID=<find the PARTUUID of the root partition> rw
```

-   `initrd /amd-ucode.img` is specific to my platform (AMD cpu)
-   use `blkid -s PARTUUID -o value /dev/sda3 >> /boot/loader/entries/arch.conf` to find the right PARTUUID

###  15. Unmount, exit and reboot

```bash
exit
umount -R /mnt
reboot
```

###  16. Install KDE

App to install:
`5 13 14 21 35 44 46 58 106 124 139 142 145 154 170`

```bash
sudo pacman -S plasma-meta kde-applications
sudo systemctl enable sddm
reboot
```

###  17. Add bluetooth

```bash
sudo pacman -S bluez bluez-utils
```

###  18. Enable TRIM on SSD

Enables TRIM for SSD. TRIM will be executed every week, starting when you run the following command.

```bash
systemctl enable fstrim.timer
```
