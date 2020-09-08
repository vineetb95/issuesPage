import {Entity, model, property} from '@loopback/repository';

@model()
export class Issue extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  author: string;

  @property({
    type: 'string',
  })
  assignee?: string;

  @property({
    type: 'date',
    required: true,
  })
  dateOfcreation: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isOpen: boolean;


  constructor(data?: Partial<Issue>) {
    super(data);
  }
}

export interface IssueRelations {
  // describe navigational properties here
}

export type IssueWithRelations = Issue & IssueRelations;
