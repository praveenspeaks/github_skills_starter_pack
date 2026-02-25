/*
Example: Angular HttpClient consumer pattern.
Keep mapping isolated so contract changes are localized.
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface OrderDto {
  id: string;
  status: string;
  // Additive fields should be optional to maintain backward compatibility
  approvedBy?: string;
}

@Injectable({ providedIn: 'root' })
export class OrdersApi {
  constructor(private http: HttpClient) {}

  getOrder(id: string): Observable<OrderDto> {
    return this.http.get<OrderDto>(`/api/orders/${id}`).pipe(
      map(dto => ({
        ...dto,
        // Example fallback
        status: dto.status ?? 'Unknown',
      }))
    );
  }
}
