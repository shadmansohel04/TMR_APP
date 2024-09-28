import asyncio
import websockets

async def send_messages(websocket, path):
    while True:
        message = input("GIVE ME MESSAGE: ")
        await websocket.send(message)
        await asyncio.sleep(2)  # Send a message every 2 seconds

start_server = websockets.serve(send_messages, "localhost", 8080)

asyncio.get_event_loop().run_until_complete(start_server)
print("WebSocket server started on ws://localhost:8080")
asyncio.get_event_loop().run_forever()
