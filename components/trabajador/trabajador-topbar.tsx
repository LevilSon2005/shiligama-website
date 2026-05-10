"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, RefreshCw, Clock, LogOut, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

interface TrabajadorTopbarProps {
  title: string
  onRefresh?: () => void
}

export function TrabajadorTopbar({ title, onRefresh }: TrabajadorTopbarProps) {
  const router = useRouter()
  const [turnosModalOpen, setTurnosModalOpen] = useState(false)

  const handlePerfilClick = () => {
    router.push("/trabajador/perfil")
  }

  const handleTurnosClick = () => {
    setTurnosModalOpen(true)
  }

  const handleLogout = () => {
    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.clear()
      sessionStorage.clear()
    }
    // Redirect to login
    router.push("/login")
  }

  return (
    <>
      <header className="sticky top-0 z-30 bg-background border-b border-border">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          {/* Page title */}
          <div className="flex items-center gap-4 pl-12 lg:pl-0">
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            {onRefresh && (
              <Button variant="ghost" size="icon" onClick={onRefresh} className="h-8 w-8">
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Actualizar</span>
              </Button>
            )}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                    3
                  </Badge>
                  <span className="sr-only">Notificaciones</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <span className="font-medium text-sm">Nuevo pedido #1025</span>
                  <span className="text-xs text-muted-foreground">Hace 2 minutos</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <span className="font-medium text-sm">Pedido #1023 listo para entregar</span>
                  <span className="text-xs text-muted-foreground">Hace 10 minutos</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <span className="font-medium text-sm">Stock bajo: Leche Gloria</span>
                  <span className="text-xs text-muted-foreground">Hace 30 minutos</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/worker.jpg" alt="Carlos Mendoza" />
                    <AvatarFallback className="bg-primary text-primary-foreground">CM</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>Carlos Mendoza</span>
                    <span className="text-xs font-normal text-muted-foreground">Trabajador</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handlePerfilClick} className="cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Mi perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleTurnosClick} className="cursor-pointer">
                  <Clock className="h-4 w-4 mr-2" />
                  Mis turnos
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mis Turnos Modal */}
      <Dialog open={turnosModalOpen} onOpenChange={setTurnosModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Mis Turnos
            </DialogTitle>
            <DialogDescription>
              Tu horario de trabajo asignado
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Weekdays */}
            <Card>
              <CardContent className="pt-4">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Lunes a Viernes
                </h4>
                <div className="space-y-2 pl-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Turno mañana</span>
                    <span className="font-medium text-foreground">8:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Turno tarde</span>
                    <span className="font-medium text-foreground">12:00 PM - 5:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekends */}
            <Card>
              <CardContent className="pt-4">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Sábados y Domingos
                </h4>
                <div className="pl-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Turno único</span>
                    <span className="font-medium text-foreground">8:00 AM - 12:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-xs text-muted-foreground text-center">
              Para cambios en tu horario, contacta al administrador
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
