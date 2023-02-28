from typing import Optional
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, Field


class Tags(BaseModel):
    badge_info: str
    badges: str
    client_nonce: str = None
    color: str
    display_name: str
    emotes: str
    first_msg: int
    flags: str
    id: UUID
    mod: int
    returning_chatter: int
    room_id: int
    subscriber: int
    tmi_sent_ts: str
    turbo: int
    user_id: int
    user_type: str


class TwitchChat(BaseModel):
    text: str
    username: str
    display_name: str
    channel: str
    timestamp: datetime
    id: UUID
    type: int
    raw: str
    tags: Tags
